"use client"

import { useTransition, useState } from 'react';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import {useForm} from "react-hook-form";

import { SettingsSchema } from '@/schemas';
import { settings } from "@/actions/settings";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from 'sonner';
import { Form, FormControl, FormDescription, FormField, FormLabel, FormItem, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectLabel, SelectValue, SelectTrigger, SelectItem } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useSession } from 'next-auth/react';
import { useCurrentUser } from '@/hooks/use-current-user';
import { UserRole } from '@prisma/client';
import { FormError } from '@/components/form-error';
import { error } from 'console';
import { FormSuccess } from '@/components/form-success';

const SettingsPage = () => {
    const user = useCurrentUser();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const {update} = useSession();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues:{
            password: undefined,
            newPassword: undefined,
            name: user?.name || undefined,
            email: user?.email || undefined,
            role:user?.role,
            isTwoFactorEnabled:user?.isTwoFactorEnabled || undefined,
        }
    });
     const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        startTransition(() => {
            settings(values).then((data) => 
            {
                if (data.error) {
                    toast.error("😔not updated please try again later!")
                    setError(data.error)
                }
                if (data.success) {
                    update();
                    setSuccess(data.success)
                    toast.success("🥳 Successfully updated!")
                }
            })
            .catch(()=>setError("Something went wrong!"));
        })
     }

    return(
        <Card className="w-1/2">
            <CardHeader className="text-2xl font-semibold text-center">⚙️Settings</CardHeader>
            <CardContent className="space-y-4 items-start justify-start">
                <Form {...form}>
                    <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
                        <div className=''>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({field})=>(
                                    <FormItem className='items-center justify-between rounded-lg border p-3 my-2 shadow-md'>
                                        <FormLabel>Name: </FormLabel>
                                        <FormControl>
                                            <Input
                                            {...field}
                                            placeholder='John Doe'
                                            disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            {user?.isOAuth === false && (
                                <>                            
                                    <FormField
                                    control={form.control}
                                    name='email'
                                    render={({field})=>(
                                        <FormItem className='items-center justify-between rounded-lg border p-3 my-2 shadow-md'>
                                            <FormLabel>Email: </FormLabel>
                                            <FormControl>
                                                <Input
                                                {...field}
                                                placeholder='abc@mail.com'
                                                disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                    />
                                </>
                            )}
                            
                            <FormField
                                control={form.control}
                                name='role'
                                render={({field})=>(
                                    <FormItem className='items-center justify-between rounded-lg border p-3 my-2 shadow-md'>
                                        <FormLabel>Role</FormLabel>
                                        <FormControl>
                                            <Select
                                            disabled={isPending}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            >
                                                <FormControl>
                                                   <SelectTrigger>
                                                        <SelectValue placeholder="Select a role" />
                                                    </SelectTrigger> 
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value={UserRole.ADMIN}>
                                                        Admin
                                                    </SelectItem>
                                                    <SelectItem value={UserRole.USER}>
                                                        User
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        
                            <FormField
                                control={form.control}
                                name='password'
                                render={({field})=>(
                                    <FormItem className='items-center justify-between rounded-lg border p-3 my-2 shadow-md'>
                                        <FormLabel>Current Password: </FormLabel>
                                        <FormControl>
                                            <Input
                                            {...field}
                                            placeholder='*****'
                                            type='password'
                                            disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='newPassword'
                                render={({field})=>(
                                    <FormItem className='items-center justify-between rounded-lg border p-3 my-2 shadow-md'>
                                        <FormLabel>New Password: </FormLabel>
                                        <FormControl>
                                            <Input
                                            {...field}
                                            placeholder='*****'
                                            type='password'
                                            disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='isTwoFactorEnabled'
                                render={({field})=>(
                                    <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 my-2 shadow-md'>
                                        <div className='space-y-0.5'>
                                            <FormLabel>2FA</FormLabel>
                                            <FormDescription>
                                                Two Factor Authentication
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                            disabled={isPending}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormError message={error} />
                        <FormSuccess message={success}/>
                        <div>
                            <Button type='submit'>
                                Save
                            </Button>                    
                        </div>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="space-y-4 items-center justify-center">
                
            </CardFooter>
        </Card>
    )
}

export default SettingsPage;