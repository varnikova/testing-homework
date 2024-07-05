module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	moduleDirectories: ['node_modules'],

	// https://stackoverflow.com/questions/56547215/react-testing-library-why-is-tobeinthedocument-not-a-function
	setupFilesAfterEnv: ['<rootDir>/test/setup-test.ts'],
}
