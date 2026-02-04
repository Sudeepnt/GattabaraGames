'use server';

export async function submitContactForm(data: { name: string; email: string; message: string }) {
    try {
        // In a real application, you would send an email or save to a database here.
        console.log('Contact form submitted:', data);

        // Simulate a delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return { success: true };
    } catch (error) {
        console.error('Contact form submission error:', error);
        return { success: false, error: 'Failed to submit form.' };
    }
}
