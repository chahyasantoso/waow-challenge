const LoginLayout = ({ children }) => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block " >
        <div className="h-full flex flex-col items-center justify-center p-8 poly_bg">
          <img
            src="/src/assets/heroimage.svg"
            className="max-w-[80%] h-auto "
          />
        </div>
        <img
          src="/src/assets/waow.png"
          className="absolute bottom-5 left-10 w-80"
        />
      </div>
      <div className="flex items-center justify-center p-8 ">
        <div className="w-full max-w-md space-y-8 bg-transparent">
          {children}
        </div>
      </div>
    </div>
  );
}

export default LoginLayout