export default PrivateRoute = ({ element, ...props }) => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('AuthToken') !== null;
  
    return isAuthenticated ? (
      <Route {...props} element={element} />
    ) : (
      <Navigate to="/" replace />
    );
  };
