import { login } from "./login";

    const email = "unit.test@stud.noroff.no";
    const password = "unit.test.password123"
    const accessToken = "mockToken"


global.localStorage = mockLocalStorage

const mockLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};

const mockFailedApiFetch = jest.fn().mockResolvedValue({
    ok: false,
    statusText: "Unauthorized",
    statusCode: 401,
})

describe("Login function", () => {
    it('should send credentials to API and receive accesstoken to insert to localstorage', async () => {
        global.fetch = mockFetchApi;
        await login(email,password);
        expect(fetch).toBe(mockFetchApi);
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith("token", "mockToken")
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith("profile", '{\"name\":\"tester\",\"email\":\"unit.test@stud.noroff.no\"}');
    })
})

it("should fail if api call does not succeed in putting token into storage", async () => {
    global.fetch = mockFailedApiFetch;
    await expect(login(email,password)),rejects.toThrow("Unauthorized");
})

const mockFetchApi = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue({
        name:"testUser",
        email: email,
        accessToken: accessToken
    })
});
