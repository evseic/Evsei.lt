document.addEventListener('DOMContentLoaded', async () => {
    const authSection = document.getElementById('authSection');
    const dashboardSection = document.getElementById('dashboardSection');
    const loginForm = document.getElementById('loginForm');
    const authError = document.getElementById('authError');
    const leadsTable = document.getElementById('leadsTable');
    const emptyState = document.getElementById('emptyState');
    const logoutBtn = document.getElementById('logoutBtn');

    // Check current session
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session) {
        showDashboard();
    }

    // Handle Login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
        
        if (error) {
            authError.textContent = error.message;
        } else {
            showDashboard();
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
        const { data, error } = await supabaseClient
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Fetch error:', error);
            return;
        }

        if (!data || data.length === 0) {
            emptyState.classList.remove('hidden');
            return;
        }

        leadsTable.innerHTML = data.map(lead => `
            <tr>
                <td>
                    <div class="lead-name">${escapeHtml(lead.name)}</div>
                    <div class="lead-email">${escapeHtml(lead.email)}</div>
                </td>
                <td>
                    <div class="lead-details">${escapeHtml(lead.project_details || 'No details provided.')}</div>
                </td>
                <td>
                    <div class="lead-date">${new Date(lead.created_at).toLocaleDateString()}</div>
                </td>
            </tr>
        `).join('');
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
