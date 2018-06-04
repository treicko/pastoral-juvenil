/* global Tracker AccountsTemplates Meteor */
/* eslint-disable no-unused-expressions */

Tracker.autorun(() => {
  const email = AccountsTemplates.removeField('email');
  const password = AccountsTemplates.removeField('password');
  const createMember = function(error, state) {
    if (!error) {
      if (state === 'signUp') {
        const currentUser = Meteor.user();
        const newMember = {
          name: currentUser.profile.name,
          phone: currentUser.profile.phone,
          userId: currentUser._id,
          // messages: [],
          // unReadMessage: [],
          // unReadNotification: 0,
        };

        const newKardex = { userId: currentUser._id };

        Meteor.call('insertMember', newMember);
        Meteor.call('inserKardex', newKardex);
      }
    }
  };

  email.displayName = 'Correo electronico';

  password.displayName.changePwd = 'Nueva contraseña';
  password.displayName.default = 'Contraseña';
  password.displayName.resetPwd = 'Nueva contraseña';

  AccountsTemplates.configure({
    texts: {
      button: {
        signIn: 'Iniciar sesión',
        signUp: 'Registrate',
      },
      requiredField: 'Campo requerido',
      navSignIn: 'Iniciar sesión',
      navSignOut: 'Cerrar sesión',
      title: {
        changePwd: 'Password Title',
        enrollAccount: 'Enroll Title',
        forgotPwd: 'Forgot Pwd Title',
        resetPwd: 'Reset Pwd Title',
        signIn: 'Pastoral Juvenil',
        signUp: 'Registrate',
        verifyEmail: 'Verify Email Title',
      },
      errors: {
        loginForbidden: 'La direción de correo eletrónico o la contraseña que has introducido no son correctas.',
        pwdMismatch: 'Las contraseñas no coinciden',
      },
      optionalField: 'Opcional',
      signInLink_pre: 'Ya tienes una cuenta?',
      signInLink_link: 'Inicia sesion',
      signUpLink_pre: 'No tienes una cuenta?',
      signUpLink_link: 'Registrate',
    },
    onSubmitHook: createMember,
  });

  AccountsTemplates.addFields([
    {
      _id: 'name',
      type: 'text',
      displayName: 'Nombre completo',
      required: true,
    },
    {
      _id: 'phone',
      type: 'tel',
      displayName: 'Celular',
      errStr: 'El numero de telefono no es valido!',
    },
  ]);

  AccountsTemplates.addField(email);
  AccountsTemplates.addField(password);
  AccountsTemplates.addField({
    _id: 'password_again',
    type: 'password',
    displayName: 'Repetir contraseña',
    required: true,
    errStr: 'At least 1 digit, 1 lower-case and 1 upper-case leo papa',
  });
});
