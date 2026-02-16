class RegistrationError(Exception):
    """Base exception for registration errors"""
    pass


class UserAlreadyExistsError(RegistrationError):
    """Raised when user already has the requested roles"""
    pass


class NoRoleSelectedError(RegistrationError):
    """Raised when no role is selected"""
    pass