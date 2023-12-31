import { useEffect, useRef } from 'react';
import { useUserSignup } from '../../api/hooks/users/useSignUp';
import { FormButton } from '../Buttons/formButton';
import { Input } from '../Input/input';
import useTasksStore from '../../utils/taskStore';
import { useNavigate } from 'react-router-dom';
import { toTasks } from '../../routers';
import { useGetAuthenticadedUser } from '../../api/hooks/users/useGetAuthenticadedUser';

export const SignupMenu = () => {
  const navigate = useNavigate();
  const { mutate: userSignup, error: signupError } = useUserSignup();
  const { refetch: refetchUsers, data: loggedUser } = useGetAuthenticadedUser();
  const {
    newUserName,
    setNewUsername,
    newUserEmail,
    setNewUserEmail,
    newUserPassword,
    setNewUserPassword,
    setShowSignupModal,
  } = useTasksStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (signupError && !loggedUser) {
      setShowSignupModal(true);
    } else if (!signupError && loggedUser) {
      setShowSignupModal(false);
    }
  }, [loggedUser, signupError, setShowSignupModal]);

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmUserName = newUserName.trim();
    const trimmUserEmail = newUserEmail.trim();
    const trimmUserPassword = newUserPassword.trim();

    if (!trimmUserName && !trimmUserEmail && !trimmUserPassword) {
      return;
    }

    userSignup({
      username: trimmUserName,
      email: trimmUserEmail,
      password: trimmUserPassword,
    });

    if (loggedUser) {
      refetchUsers();
    }

    navigate(toTasks());
    setNewUsername('');
    setNewUserEmail('');
    setNewUserPassword('');
  };

  return (
    <div className='h-full w-full leading-normal text-black dark:text-white grid place-items-center fixed backdrop-blur-sm !bg-transparent'>
      <div className='rounded-lg my-0 mx-auto text-left p-[5px] max-w-md md:w-full w-fit leading-normal border-[2px] border-davysGray'>
        <div className='p-5 bg-white rounded-lg'>
          <div className='flex justify-between bg-white'>
            <h3 className='md:text-[25px] text-[20px]'>Sign Up</h3>
            <button
              className='dark:bg-jet text-black dark:text-white'
              onClick={() => setShowSignupModal(false)}
            >
              X
            </button>
          </div>
          <form
            className='mb-[10px] p-[10px] text-alto font-medium bg-white dark:bg-jet'
            onSubmit={onFormSubmit}
          >
            {signupError && (
              <div className='!bg-red-300 w-full h-fit grid place-items-center justify-start pl-2 font-medium text-red-900 rounded-lg'>
                <p className='m-1'>
                  Username already taken.
                  <br /> Please choose a different one or log in instead.
                </p>
              </div>
            )}
            <div className='py-[10px] flex flex-col rounded-lg bg-white'>
              <label className='text-lg text-black dark:text-white'>
                Username
              </label>
              <Input
                className='border-solid border-[1px] p-[5px] border-silverChalice w-[100%] text-black'
                placeholder='Username'
                ref={inputRef}
                required={true}
                type='text'
                value={newUserName}
                onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
                  setNewUsername(target.value)
                }
              />
            </div>
            <div className='py-[10px] flex flex-col rounded-lg bg-white'>
              <label className='text-lg text-black dark:text-white'>
                Email
              </label>
              <Input
                className='border-solid border-[1px] p-[5px] border-silverChalice w-[100%] text-black'
                placeholder='name@company.com'
                required={true}
                type='email'
                value={newUserEmail}
                onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
                  setNewUserEmail(target.value)
                }
              />
            </div>
            <div className='py-[10px] flex flex-col rounded-lg bg-white'>
              <label className='text-lg text-black dark:text-white'>
                Password
              </label>
              <input
                className='border-solid border-[1px] p-[5px] border-silverChalice w-[100%] text-black'
                placeholder='**********'
                type='password'
                value={newUserPassword}
                onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
                  setNewUserPassword(target.value)
                }
              />
            </div>
            <FormButton className='border-none cursor-pointer p-[10px] w-[100%] hover:scale-[1.03] dark:bg-sherpaBlue bg-teal text-white'>
              Sign up
            </FormButton>
          </form>
        </div>
      </div>
    </div>
  );
};
