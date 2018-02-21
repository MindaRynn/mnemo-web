import ReactOnRails from 'react-on-rails';

import LandingPage from '../bundles/MnemoFrontend/components/LandingPage';
import LoginForm from '../bundles/MnemoFrontend/components/devise/sessions/LoginForm';
import RegistrationForm from '../bundles/MnemoFrontend/components/devise/registrations/RegistrationForm';
import ForgotPasswordForm from '../bundles/MnemoFrontend/components/devise/passwords/ForgotPasswordForm';
import ResetPasswordForm from '../bundles/MnemoFrontend/components/devise/passwords/ResetPasswordForm';


// This is how react_on_rails can see the MnemoFrontend in the browser.
ReactOnRails.register({
  LandingPage,
  LoginForm,
  RegistrationForm,
  ForgotPasswordForm,
  ResetPasswordForm
});
