import { auth } from "./firebaseConfig";

const run = async (): Promise<void> => {
    try {
        const officer = await auth.getUserByEmail("officer@pixell-river.com");
        const manager = await auth.getUserByEmail("manager@pixell-river.com");
        const admin = await auth.getUserByEmail("admin@pixell-river.com");

        await auth.setCustomUserClaims(officer.uid, { role: "officer" });
        await auth.setCustomUserClaims(manager.uid, { role: "manager" });
        await auth.setCustomUserClaims(admin.uid, { role: "admin" });

        console.log("Custom claims set successfully");
    } catch (error) {
        console.error(error);
    }
};

run();