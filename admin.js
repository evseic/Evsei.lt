document.addEventListener('DOMContentLoaded', async () => {
    const authSection = document.getElementById('authSection');
    const dashboardSection = document.getElementById('dashboardSection');
    const loginForm = document.getElementById('loginForm');
    const authError = document.getElementById('authError');
    const leadsTable = document.getElementById('leadsTable');
    const emptyState = document.getElementById('emptyState');
    const logoutBtn = document.getElementById('logoutBtn');

    // Safety check for library loading
    if (typeof supabaseClient === 'undefined') {
        authError.textContent = "Error: Supabase client not loaded. Check your connection or scripts.";
        console.error("supabaseClient is undefined");
        return;
    }

    // Check current session
    try {
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (session) {
            showDashboard();
        }
    } catch (e) {
        console.error("Session check failed", e);
    }

    // Handle Login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        authError.textContent = "Attempting login...";
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
            
            if (error) {
                // Check specifically for confirmation error
                if (error.message.includes("Email not confirmed")) {
                    authError.textContent = "Error: Please check your email and click the confirmation link from Supabase.";
                } else {
                    authError.textContent = "Login Failed: " + error.message;
                }
            } else {
                showDashboard();
            }
        } catch (err) {
            authError.textContent = "System Error: " + err.message;
        }
    });

    // Handle Logout
    logoutBtn.addEventListener('click', async () => {
        await supabaseClient.auth.signOut();
        window.location.reload();
    });

    async function showDashboard() {
        authSection.classList.add('hidden');
        dashboardSection.classList.remove('hidden');
        await fetchLeads();
    }

    async function fetchLeads() {
        try {
            const { data, error } = await supabaseClient
                .from('leads')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            if (!data || data.length === 0) {
                emptyState.classList.remove('hidden');
                leadsTable.innerHTML = '';
                return;
            }

            emptyState.classList.add('hidden');
            leadsTable.innerHTML = data.map(lead => `
                <tr>
                    <td>
                        <div class="lead-name">${escapeHtml(lead.name)}</div>
                        <div class="lead-email">${escapeHtml(lead.email)}</div>
                    </td>
                    <td>
                        <div class="lead-details" style="font-family: monospace;">${escapeHtml(lead.phone || '-')}</div>
                    </td>
                    <td>
                        <div class="lead-details">${escapeHtml(lead.project_details || 'No details provided.')}</div>
                    </td>
                    <td>
                        <div class="lead-date">${new Date(lead.created_at).toLocaleDateString()}</div>
                    </td>
                </tr>
            `).join('');
        } catch (err) {
            console.error('Fetch error:', err);
            authError.textContent = "Database Error: " + err.message;
            authSection.classList.remove('hidden');
        }
    }

    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
