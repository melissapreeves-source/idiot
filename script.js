async function loadEntries() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        renderList(data);
        renderJson(data);
    } catch (error) {
        console.warn('Using fallback data');
        const fallback = getFallbackData();
        renderList(fallback);
        renderJson(fallback);
    }
}
function renderList(data) {
    const container = document.getElementById('entry-container');
    if (!container) return;
    container.innerHTML = '';
    data.forEach(entry => {
        const div = document.createElement('div');
        div.className = 'list-entry';
        div.innerHTML = `
            <span class="steam-name">${escapeHtml(entry.steamName)}</span>
            <span class="reporter">${escapeHtml(entry.reporter)}</span>
            <span class="steam-id">${escapeHtml(entry.steamId)}</span>
        `;
        container.appendChild(div);
    });
}
function renderJson(data) {
    const output = document.getElementById('json-output');
    if (!output) return;
    output.textContent = JSON.stringify(data, null, 2);
}
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
function getFallbackData() {
    return [
        { steamName: 'N/A', reporter: 'N/A', steamId: 'STEAM_0:1:N/A' },
  
    ];
}
document.addEventListener('DOMContentLoaded', loadEntries);
