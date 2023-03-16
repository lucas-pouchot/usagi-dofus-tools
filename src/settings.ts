interface SettingsInterface {
    base_url: string
    api_url: string
    defaultApiLimit: number
    defaultToastDuration: number
    defaultDataTableRows: number
    defaultDataTableRowsAllowed: number[]
}

const settings: SettingsInterface = {
    base_url: <string>import.meta.env.VITE_BASE_URL,
    api_url: <string>import.meta.env.VITE_SERVER_API_URL,
    defaultApiLimit: 10,
    defaultToastDuration: 5000,
    defaultDataTableRows: 25,
    defaultDataTableRowsAllowed: [10, 25, 50, 100],
};

if (settings.base_url && settings.base_url.charAt(settings.base_url.length - 1) === '/') {
    settings.base_url = settings.base_url.substr(0, settings.base_url.length - 1);
}

if (settings.api_url && settings.api_url.charAt(settings.api_url.length - 1) === '/') {
    settings.api_url = settings.api_url.substr(0, settings.api_url.length - 1);
}

export default settings;

export const {
    base_url,
    api_url,
    defaultApiLimit,
    defaultToastDuration,
    defaultDataTableRows,
    defaultDataTableRowsAllowed,
} = settings;
