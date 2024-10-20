"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function FreeTrialPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [plan, setPlan] = useState('');
  const [code, setCode]= useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Free trial started with:', { email, password, name, plan });
    router.push('/');
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center">
            <h1 className="text-4xl font-bold text-primary">hulu</h1>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Start Your Free Trial</CardTitle>
          <CardDescription className="text-center">Enter your details to begin your free Hulu trial.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Select Plan</Label>
              <Select onValueChange={setPlan} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic Plan</SelectItem>
                  <SelectItem value="standard">Standard Plan</SelectItem>
                  <SelectItem value="premium">Premium Plan</SelectItem>
                  <SelectItem value="Free Trail">Free Trial</SelectItem>
                </SelectContent>
              </Select>
             
            </div>

            <div className="space-y-2">
              <Label htmlFor="activation code">Activation Code</Label>
              <Input
                id="code"
                type="code"
                placeholder='Device Activation Code'
                value={code}
                onChange={(e) => setCode(e.target.value)}
               
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">Start Free Trial</Button>
            <div className="text-sm text-center">
              Already have an account? <a href="/sign-in" className="text-primary hover:underline">Sign in</a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}