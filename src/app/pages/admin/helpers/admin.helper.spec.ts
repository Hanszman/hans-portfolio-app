import { formatAdminIdentity } from './admin.helper';

describe('formatAdminIdentity', () => {
  it('should format the current admin identity when a user exists', () => {
    expect(
      formatAdminIdentity({
        id: '5f8e1e74-2d49-4b5c-9724-2e8c9c8b0e11',
        email: 'victor@example.com',
        name: 'Victor Hanszman',
        role: 'ADMIN',
      }),
    ).toBe('Victor Hanszman · ADMIN');
  });

  it('should return an empty string when there is no authenticated user', () => {
    expect(formatAdminIdentity(null)).toBe('');
  });
});
