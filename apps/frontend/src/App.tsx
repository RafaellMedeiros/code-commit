import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { APP_ROUTES } from './constants/routes';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={APP_ROUTES.ROOT} element={<Navigate to={APP_ROUTES.LOGIN} replace />} />
        <Route path={APP_ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={APP_ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path="*" element={<Navigate to={APP_ROUTES.LOGIN} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
