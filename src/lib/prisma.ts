import { PrismaClient } from '@prisma/client';

// eslint-disable-next-line import/no-mutable-exports
let prisma;

if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient();
} else {
	if (!global.prisma) {
		global.prisma = new PrismaClient();
	}
	prisma = global.prisma;
}

(async () => {
	await prisma.$connect();
})();

(async () => {
	await prisma.$on('beforeExit', async () => {
		console.log('beforeExit hook');
		// PrismaClient still available
		await prisma.message.create({
			data: {
				message: 'Shutting down server',
			},
		});
	});
})();

export default prisma;
