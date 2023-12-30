const request = require('supertest');
const app = require('../index'); 


describe('ThreadController', () => {
  describe('GET /threads', () => {
    it('should return an array of threads with pagination information', async () => {
      const response = await request(app).get('/threads');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.threads)).toBe(true);
      expect(response.body.totalPages).toBeDefined();
    });

    it('should return 404 if no threads are found', async () => {
      const response = await request(app).get('/threads?page=1000');
      expect(response.status).toBe(404);
      expect(response.text).toBe('404 - No threads found!');
    });
  });

  describe('GET /threads/:threadId', () => {
    it('should return a single thread', async () => {
      const threadId = 'moi-ngay-1-buc-anh-chup-bang-dien-thoai.88160';
      const response = await request(app).get(`/threads/${threadId}`);
      expect(response.status).toBe(200);
      expect(response.body.threadId).toBe(threadId);
    });

    it('should return 404 if no thread is found', async () => {
      const invalidThreadId = 'siuuuuuuuuuuuuuuuuu'; 
      const response = await request(app).get(`/threads/${invalidThreadId}`);
      expect(response.status).toBe(404);
      expect(response.text).toBe('404 - No threads found!');
    });
  });

  describe('GET /threads/search', () => {
    it('should return an array of threads matching the search criteria', async () => {
      const response = await request(app).get('/threads/search?text=voz&page=0');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.threads)).toBe(true);
      expect(response.body.totalPages).toBeDefined();
    });

    it('should return 404 if no threads match the search criteria', async () => {
      const response = await request(app).get('/threads/search?text=siuuuuuuuuuuu&page=0');
      expect(response.status).toBe(404);
      expect(response.text).toBe('404 - No threads found!');
    });
  });
});

describe('ReplyController', () => {
  describe('GET /threads/:threadId/replies', () => {
    it('should return an array of replies with pagination information', async () => {
      const threadId = 'moi-ngay-1-buc-anh-chup-bang-dien-thoai.88160'; 
      const response = await request(app).get(`/threads/${threadId}/replies?page=0`);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.replies)).toBe(true);
      expect(response.body.totalPages).toBeDefined();
    });

    it('should return 404 if no replies are found', async () => {
      const threadId = 'moi-ngay-1-buc-anh-chup-bang-dien-thoai.88160'; 
      const response = await request(app).get(`/threads/${threadId}/replies?page=1000`);
      expect(response.status).toBe(404);
      expect(response.text).toBe('404 - No replies found!');
    });
  });

  describe('GET /threads/:threadId/replies/search', () => {
    it('should return an array of replies matching the search criteria', async () => {
      const threadId = 'moi-ngay-1-buc-anh-chup-bang-dien-thoai.88160'; 
      const response = await request(app).get(`/threads/${threadId}/replies/search?text=free&page=0`);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.replies)).toBe(true);
      expect(response.body.totalPages).toBeDefined();
    });

    it('should return 404 if no replies match the search criteria', async () => {
      const threadId = 'moi-ngay-1-buc-anh-chup-bang-dien-thoai.88160'; // Thay threadId bằng một threadId hợp lệ trong cơ sở dữ liệu của bạn
      const response = await request(app).get(`/threads/${threadId}/replies/search?text=siuuuuuuuuuu&page=0`);
      expect(response.status).toBe(404);
      expect(response.text).toBe('404 - No replies found!');
    });
  });
});