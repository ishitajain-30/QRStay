import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, User } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginFormData, RegisterFormData } from "@/types/auth";
import { setAuthToken, setUser, getDashboardPath } from "@/lib/auth";
import { loginSchema, registerSchema } from "@/lib/validations/auth";
import { authApi } from "@/lib/api/auth";

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerFormRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onLogin = async (data: LoginFormData) => {
    try {
      setIsLoading(true);

      const response = await authApi.login({
        email: data.email,
        password: data.password,
      });

      console.log("Login API response: ", response);

      if (!response.token || !response.user) {
        throw new Error("Invalid response from server");
      }

      setAuthToken(response.token);
      setUser(response.user);
      toast.success("Login successful");

      navigate(getDashboardPath(response.user.role));
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error("Login failed: " + error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = async (data: RegisterFormData) => {
    try {
      const response = await authApi.register({
        username: data.username,
        email: data.email,
        password: data.password,
      });

      console.log(response);

      setAuthToken(response.token);
      setUser(response.user);

      toast.success("Registration successful");

      navigate(getDashboardPath(response.user.role));
    } catch (error) {
      toast.error("Registration failed: " + (error as Error).message);
    }
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {isLogin ? "Login" : "Register"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLogin ? (
            <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    {...loginRegister("email")}
                    type="email"
                    id="email"
                    className="pl-10"
                    placeholder="Enter your email"
                  />
                </div>
                {loginErrors.email && (
                  <p className="text-sm text-red-500">
                    {loginErrors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    {...loginRegister("password")}
                    type="password"
                    id="password"
                    className="pl-10"
                    placeholder="Enter your password"
                  />
                </div>
                {loginErrors.password && (
                  <p className="text-sm text-red-500">
                    {loginErrors.password.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full">
                {isLoading ? "Logging In..." : "Login"}
              </Button>
            </form>
          ) : (
            <form
              onSubmit={handleRegisterSubmit(onRegister)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="username">User Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    {...registerFormRegister("username")}
                    type="text"
                    id="username"
                    className="pl-10"
                    placeholder="Enter your username"
                  />
                </div>
                {registerErrors.username && (
                  <p className="text-sm text-red-500">
                    {registerErrors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    {...registerFormRegister("email")}
                    type="email"
                    id="email"
                    className="pl-10"
                    placeholder="Enter your email"
                  />
                </div>
                {registerErrors.email && (
                  <p className="text-sm text-red-500">
                    {registerErrors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    {...registerFormRegister("password")}
                    type="password"
                    id="password"
                    className="pl-10"
                    placeholder="Enter your password"
                  />
                </div>
                {registerErrors.password && (
                  <p className="text-sm text-red-500">
                    {registerErrors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    {...registerFormRegister("confirmPassword")}
                    type="password"
                    id="confirmPassword"
                    className="pl-10"
                    placeholder="Confirm your password"
                  />
                </div>
                {registerErrors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {registerErrors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full">
                {isLoading ? "Registering" : "Register"}
              </Button>
            </form>
          )}

          <div className="mt-4 text-center">
            <Button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm w-full"
            >
              {isLogin
                ? "Don't have an account ?"
                : "Already have an account ?"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
