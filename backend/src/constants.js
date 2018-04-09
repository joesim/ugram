if (process.env.FRONTEND_URL === undefined) {
	console.error("You need to set FRONTEND_URL");
	process.exit(0);
}

export const frontend_url = process.env.FRONTEND_URL;
export const formats = [[306, 190, "_t"], [1200, 600, "_p"], [0, 0, ""]];
