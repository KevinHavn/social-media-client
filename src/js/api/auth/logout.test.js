import { logout } from "./logout";

const mockLocalStorage = {
    getItem: jest.fn((key) => localStorage[key] || null),
    removeItem: jest.fn((key, value) => localStorage[key] = value)
  };
  global.localStorage = mockLocalStorage;

  describe('Logout function', () => {

it('passes if function removes information from local storage', () => {
        logout();
        expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('profile');
        expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('token');
        expect(mockLocalStorage.removeItem).toHaveBeenCalledTimes(2);
    });

    it('should pass if information has successfully been cleared', () => {
        expect(mockLocalStorage.getItem('token')).toBeNull();
        expect(mockLocalStorage.getItem('profile')).toBeNull();
        expect(mockLocalStorage.getItem).toHaveBeenCalledTimes(2);
    });
  })