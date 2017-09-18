Tracker.autorun(() => {
  const email = AccountsTemplates.removeField('email');
  const password = AccountsTemplates.removeField('password');

  email.displayName = "Correo electronico",

  password.displayName.changePwd = 'Nueva contraseña';
  password.displayName.default = 'Contraseña';
  password.displayName.resetPwd = 'Nueva contraseña';

  AccountsTemplates.configure({
    texts: {
      button: {
        signIn: "Iniciar sesion",
        signUp: "Registrate",
      },
      navSignIn: "Iniciar sesion",
      navSignOut: "Cerrar sesion",
      title: {
        changePwd: "Password Title",
        enrollAccount: "Enroll Title",
        forgotPwd: "Forgot Pwd Title",
        resetPwd: "Reset Pwd Title",
        signIn: "Pastoral Juvenil",
        signUp: "Registrate",
        verifyEmail: "Verify Email Title",
      },
      signInLink_pre: "Ya tienes una cuenta?",
      signInLink_link: "Inicia sesion",
      signUpLink_pre: "No tienes una cuenta?",
      signUpLink_link: "Registrate",
    }
  });

  AccountsTemplates.addFields([
    {
      _id: 'name',
      type: 'text',
      displayName: "Nombre completo",
      required: true
    },
    {
      _id: 'phone',
      type: 'tel',
      displayName: "Celular",
      errStr: 'El numero de telefono no es valido!'
    }
  ]);

  AccountsTemplates.addField(email);
  AccountsTemplates.addField(password);
  AccountsTemplates.addField({
    _id: 'password_again',
    type: 'password',
    displayName: "Repetir contraseña",
    required: true,
  });  
});