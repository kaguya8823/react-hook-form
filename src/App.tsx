// react-hook-forを使った作り方
// zodという名前やパスワードの文字数規制のようなものをより確実にする機能
// ↑utils内部にあり
// npm i @hookform/resolvers
// npm i zod

//↓この中のregisterやresolverでも入力規制や文字数規表現ができるが、zodの機能を使っても同じことができる。

import { useForm } from "react-hook-form";
import "./App.css";
import { vaidationSchema } from "./utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";

interface LoginForm {
  name: string;
  email: string;
  password: string;
}

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onChange",
    resolver: zodResolver(vaidationSchema),
  });

  const onSubmit = (data: LoginForm) => {
    console.log(data);
  };
  return (
    <>
      <div className="form-container">
        <h1>Login Form</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="名前">名前</label>
          <input
            id="name"
            type="text"
            {...register("name", {
              required: "名前は必須です",
              minLength: { value: 4, message: "4文字以上で入力してください" },
            })}
          />
          <p>{errors.name?.message as React.ReactNode}</p>
          <label htmlFor="メールアドレス">メールアドレス</label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "E-mailは必須です" })}
          />
          <p>{errors.email?.message as React.ReactNode}</p>
          <label htmlFor="パスワード">パスワード</label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "パスワードは必須です",
              minLength: {
                value: 8,
                message: "パスワードは8文字以上で入力してください",
              },
            })}
          />
          <p>{errors.password?.message as React.ReactNode}</p>

          <button type="submit">送信</button>
        </form>
      </div>
    </>
  );
}

export default App;
