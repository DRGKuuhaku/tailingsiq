import { DbContext } from './types';

// User repository
export const userRepository = {
  async getAll(context: DbContext) {
    return await context.db.prepare('SELECT * FROM users').all();
  },
  
  async getById(context: DbContext, id: number) {
    return await context.db.prepare('SELECT * FROM users WHERE id = ?').bind(id).first();
  },
  
  async getByEmail(context: DbContext, email: string) {
    return await context.db.prepare('SELECT * FROM users WHERE email = ?').bind(email).first();
  },
  
  async create(context: DbContext, user: { email: string, password_hash: string, name: string, role: string }) {
    const { email, password_hash, name, role } = user;
    const result = await context.db.prepare(
      'INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, ?) RETURNING *'
    ).bind(email, password_hash, name, role).run();
    return result;
  },
  
  async update(context: DbContext, id: number, user: { name?: string, role?: string }) {
    const updates = [];
    const bindings = [];
    
    if (user.name) {
      updates.push('name = ?');
      bindings.push(user.name);
    }
    
    if (user.role) {
      updates.push('role = ?');
      bindings.push(user.role);
    }
    
    updates.push('updated_at = CURRENT_TIMESTAMP');
    
    if (updates.length === 0) {
      return null;
    }
    
    bindings.push(id);
    
    const result = await context.db.prepare(
      `UPDATE users SET ${updates.join(', ')} WHERE id = ? RETURNING *`
    ).bind(...bindings).run();
    
    return result;
  },
  
  async delete(context: DbContext, id: number) {
    return await context.db.prepare('DELETE FROM users WHERE id = ?').bind(id).run();
  }
};

// Facility repository
export const facilityRepository = {
  async getAll(context: DbContext) {
    return await context.db.prepare('SELECT * FROM facilities').all();
  },
  
  async getById(context: DbContext, id: number) {
    return await context.db.prepare('SELECT * FROM facilities WHERE id = ?').bind(id).first();
  },
  
  async create(context: DbContext, facility: { name: string, location: string, description?: string, status: string }) {
    const { name, location, description, status } = facility;
    const result = await context.db.prepare(
      'INSERT INTO facilities (name, location, description, status) VALUES (?, ?, ?, ?) RETURNING *'
    ).bind(name, location, description || null, status).run();
    return result;
  },
  
  async update(context: DbContext, id: number, facility: { name?: string, location?: string, description?: string, status?: string }) {
    const updates = [];
    const bindings = [];
    
    if (facility.name) {
      updates.push('name = ?');
      bindings.push(facility.name);
    }
    
    if (facility.location) {
      updates.push('location = ?');
      bindings.push(facility.location);
    }
    
    if (facility.description !== undefined) {
      updates.push('description = ?');
      bindings.push(facility.description);
    }
    
    if (facility.status) {
      updates.push('status = ?');
      bindings.push(facility.status);
    }
    
    updates.push('updated_at = CURRENT_TIMESTAMP');
    
    if (updates.length === 0) {
      return null;
    }
    
    bindings.push(id);
    
    const result = await context.db.prepare(
      `UPDATE facilities SET ${updates.join(', ')} WHERE id = ? RETURNING *`
    ).bind(...bindings).run();
    
    return result;
  },
  
  async delete(context: DbContext, id: number) {
    return await context.db.prepare('DELETE FROM facilities WHERE id = ?').bind(id).run();
  }
};

// Document repository
export const documentRepository = {
  async getAll(context: DbContext) {
    return await context.db.prepare('SELECT * FROM documents').all();
  },
  
  async getById(context: DbContext, id: number) {
    return await context.db.prepare('SELECT * FROM documents WHERE id = ?').bind(id).first();
  },
  
  async getByFacility(context: DbContext, facilityId: number) {
    return await context.db.prepare(
      'SELECT d.* FROM documents d JOIN facilities f ON d.metadata LIKE ? ORDER BY d.upload_date DESC'
    ).bind(`%"facility_id":${facilityId}%`).all();
  },
  
  async create(context: DbContext, document: { 
    title: string, 
    description?: string, 
    file_path: string, 
    file_type: string, 
    file_size: number, 
    uploaded_by: number, 
    metadata?: Record<string, any>, 
    tags?: string 
  }) {
    const { title, description, file_path, file_type, file_size, uploaded_by, metadata, tags } = document;
    const metadataStr = metadata ? JSON.stringify(metadata) : null;
    
    const result = await context.db.prepare(
      'INSERT INTO documents (title, description, file_path, file_type, file_size, uploaded_by, metadata, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *'
    ).bind(title, description || null, file_path, file_type, file_size, uploaded_by, metadataStr, tags || null).run();
    
    return result;
  },
  
  async update(context: DbContext, id: number, document: { 
    title?: string, 
    description?: string, 
    metadata?: Record<string, any>, 
    tags?: string 
  }) {
    const updates = [];
    const bindings = [];
    
    if (document.title) {
      updates.push('title = ?');
      bindings.push(document.title);
    }
    
    if (document.description !== undefined) {
      updates.push('description = ?');
      bindings.push(document.description);
    }
    
    if (document.metadata) {
      updates.push('metadata = ?');
      bindings.push(JSON.stringify(document.metadata));
    }
    
    if (document.tags !== undefined) {
      updates.push('tags = ?');
      bindings.push(document.tags);
    }
    
    if (updates.length === 0) {
      return null;
    }
    
    bindings.push(id);
    
    const result = await context.db.prepare(
      `UPDATE documents SET ${updates.join(', ')} WHERE id = ? RETURNING *`
    ).bind(...bindings).run();
    
    return result;
  },
  
  async delete(context: DbContext, id: number) {
    return await context.db.prepare('DELETE FROM documents WHERE id = ?').bind(id).run();
  },
  
  async search(context: DbContext, query: string) {
    return await context.db.prepare(
      'SELECT * FROM documents WHERE title LIKE ? OR description LIKE ? OR tags LIKE ? ORDER BY upload_date DESC'
    ).bind(`%${query}%`, `%${query}%`, `%${query}%`).all();
  }
};

// Monitoring data repository
export const monitoringRepository = {
  async getAll(context: DbContext) {
    return await context.db.prepare('SELECT * FROM monitoring_data ORDER BY timestamp DESC').all();
  },
  
  async getByFacility(context: DbContext, facilityId: number) {
    return await context.db.prepare(
      'SELECT * FROM monitoring_data WHERE facility_id = ? ORDER BY timestamp DESC'
    ).bind(facilityId).all();
  },
  
  async getByMetricType(context: DbContext, facilityId: number, metricType: string) {
    return await context.db.prepare(
      'SELECT * FROM monitoring_data WHERE facility_id = ? AND metric_type = ? ORDER BY timestamp DESC'
    ).bind(facilityId, metricType).all();
  },
  
  async create(context: DbContext, data: { 
    facility_id: number, 
    metric_type: string, 
    value: number, 
    source: string, 
    status: string 
  }) {
    const { facility_id, metric_type, value, source, status } = data;
    
    const result = await context.db.prepare(
      'INSERT INTO monitoring_data (facility_id, metric_type, value, source, status) VALUES (?, ?, ?, ?, ?) RETURNING *'
    ).bind(facility_id, metric_type, value, source, status).run();
    
    return result;
  },
  
  async getLatestByFacility(context: DbContext, facilityId: number) {
    return await context.db.prepare(`
      SELECT md.* 
      FROM monitoring_data md
      INNER JOIN (
        SELECT metric_type, MAX(timestamp) as max_timestamp
        FROM monitoring_data
        WHERE facility_id = ?
        GROUP BY metric_type
      ) latest ON md.metric_type = latest.metric_type AND md.timestamp = latest.max_timestamp
      WHERE md.facility_id = ?
      ORDER BY md.metric_type
    `).bind(facilityId, facilityId).all();
  }
};

// Compliance repository
export const complianceRepository = {
  async getAll(context: DbContext) {
    return await context.db.prepare('SELECT * FROM compliance_records ORDER BY last_checked DESC').all();
  },
  
  async getByFacility(context: DbContext, facilityId: number) {
    return await context.db.prepare(
      'SELECT * FROM compliance_records WHERE facility_id = ? ORDER BY last_checked DESC'
    ).bind(facilityId).all();
  },
  
  async getById(context: DbContext, id: number) {
    return await context.db.prepare('SELECT * FROM compliance_records WHERE id = ?').bind(id).first();
  },
  
  async create(context: DbContext, record: { 
    facility_id: number, 
    requirement_id: string, 
    status: string, 
    next_check_date?: string, 
    notes?: string 
  }) {
    const { facility_id, requirement_id, status, next_check_date, notes } = record;
    
    const result = await context.db.prepare(
      'INSERT INTO compliance_records (facility_id, requirement_id, status, next_check_date, notes) VALUES (?, ?, ?, ?, ?) RETURNING *'
    ).bind(facility_id, requirement_id, status, next_check_date || null, notes || null).run();
    
    return result;
  },
  
  async update(context: DbContext, id: number, record: { 
    status?: string, 
    next_check_date?: string, 
    notes?: string 
  }) {
    const updates = [];
    const bindings = [];
    
    if (record.status) {
      updates.push('status = ?');
      bindings.push(record.status);
    }
    
    if (record.next_check_date !== undefined) {
      updates.push('next_check_date = ?');
      bindings.push(record.next_check_date);
    }
    
    if (record.notes !== undefined) {
      updates.push('notes = ?');
      bindings.push(record.notes);
    }
    
    updates.push('last_checked = CURRENT_TIMESTAMP');
    
    if (updates.length === 0) {
      return null;
    }
    
    bindings.push(id);
    
    const result = await context.db.prepare(
      `UPDATE compliance_records SET ${updates.join(', ')} WHERE id = ? RETURNING *`
    ).bind(...bindings).run();
    
    return result;
  },
  
  async getComplianceStatus(context: DbContext, facilityId: number) {
    const result = await context.db.prepare(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'compliant' THEN 1 ELSE 0 END) as compliant,
        SUM(CASE WHEN status = 'non-compliant' THEN 1 ELSE 0 END) as non_compliant,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending
      FROM compliance_records
      WHERE facility_id = ?
    `).bind(facilityId).first();
    
    return result;
  }
};

// Query history repository
export const queryHistoryRepository = {
  async getAll(context: DbContext) {
    return await context.db.prepare('SELECT * FROM query_history ORDER BY timestamp DESC').all();
  },
  
  async getByUser(context: DbContext, userId: number) {
    return await context.db.prepare(
      'SELECT * FROM query_history WHERE user_id = ? ORDER BY timestamp DESC'
    ).bind(userId).all();
  },
  
  async create(context: DbContext, record: { 
    user_id: number, 
    query: string, 
    response: string 
  }) {
    const { user_id, query, response } = record;
    
    const result = await context.db.prepare(
      'INSERT INTO query_history (user_id, query, response) VALUES (?, ?, ?) RETURNING *'
    ).bind(user_id, query, response).run();
    
    return result;
  }
};
