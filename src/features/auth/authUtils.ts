// authUtils.ts

export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token'); // Ganti dengan metode penyimpanan yang sesuai
    return !!token;
  };
  
  export const isAdmin = (): boolean => {
    const token = localStorage.getItem('token'); // Ganti dengan metode penyimpanan yang sesuai
    if (token) {
      // Dekode token dan periksa peran pengguna
      const decodedToken = decodeToken(token);
      return decodedToken.role === 'admin'; // Ganti dengan properti yang sesuai pada token
    }
    return false;
  };
  
  const decodeToken = (token: string): { [key: string]: any } => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(jsonPayload);
  };
  