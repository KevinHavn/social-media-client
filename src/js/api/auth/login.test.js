import { login } from "./login";

const name = "unittester"
const email = "unit.test@stud.noroff.no";
const password = "unittest1";
const accessToken = "mockToken";

const mockLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };
  global.localStorage = mockLocalStorage;

const apiFetchMock = jest.fn().mockResolvedValue({
  ok: true,
  json: jest.fn().mockResolvedValue({
    name: name,
    email: email,
    accessToken: accessToken,
  }),
});

const apiFailMock = jest.fn().mockResolvedValue({
  ok: false,
  statusText: "Unauthorized",
  statusCode: 401,
});

describe("login function", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should attempt an API call, and insert bearer token to localstorage", async () => {
    global.fetch = apiFetchMock;
    await login(email, password);
    expect(fetch).toBe(apiFetchMock);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith("token", '\"mockToken\"');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith("profile", '{\"name\":\"unittester\",\"email\":\"unit.test@stud.noroff.no\"}');
  });
  
  it("should not pass if the API call fails or login information is unexpected", async () => {
    global.fetch = apiFailMock;
    await expect(login(email, password)).rejects.toThrow("Unauthorized");
  });
});