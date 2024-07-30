import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useFormState } from "../context";
import Stepper from "../stepper";
import { CalendarIcon, PenIcon, UserCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const IdentitySchema = z.object({
  name: z.string().min(3, { message: "Minimum 3 caracteres" }),
  firstName: z.string().min(3, { message: "Minimum 3 caracteres" }),
  lastName: z.string().min(3, { message: "Minimum 3 caracteres" }),
  birthplace: z.string().min(3, { message: "Minimum 4 caracteres" }),
  birthday: z.date(),
  citezen: z.string().min(3, { message: "Minimum 3 caracteres" }),
  phone: z
    .string()
    .min(9, { message: "Minimum 9 caracteres" })
    .max(9, { message: "Maximum 9 caracteres" }),
  mail: z.string().min(3, { message: "Minimum 3 caracteres" }),
  photo: z
    .string()
    .min(9, { message: "Minimum 9 caracteres" })
    .max(9, { message: "Maximum 9 caracteres" }),
  marital: z.string().min(3, { message: "Minimum 3 caracteres" }),
  quarter: z
    .string()
    .min(3, { message: "Minimum 3 caracteres" })
    .max(50, { message: "Maximum 50 caracteres" }),
  avenue: z
    .string()
    .min(3, { message: "Minimum 3 caracteres" })
    .max(50, { message: "Maximum 50 caracteres" }),
  no: z
    .string()
    .min(1, { message: "Minimum 9 caracteres" })
    .max(4, { message: "Maximum 4 caracteres" }),
});

type Props = {
  steps: string[];
};

const Identity = ({ steps }: Props) => {
  const { handleClick, step } = useFormState();
  const form = useForm<z.infer<typeof IdentitySchema>>({
    resolver: zodResolver(IdentitySchema),
    defaultValues: {
      name: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof IdentitySchema>) => {
    console.log(data);
    handleClick("next");
    console.log(step);
  };

  const { isValid, isSubmitting } = form.formState;

  return (
    <div className="flex flex-col justify-around">
      <Stepper steps={steps} currentStep={step} />
      <h1 className="text-xl font-semibold md:hidden text-gray-700 uppercase mb-4 text-center">
        Identity
      </h1>
      <div className="md:mt-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="col-span-1 flex items-center justify-center pb-2 md:pb-0">
                <div className="relative rounded-full w-40 h-40 flex items-center justify-center bg-yellow-400">
                  <UserCircle2 className="h-40 w-40 text-gray-400" />
                  <div className="absolute bottom-0 right-0 h-10 w-10 rounded-full border-4 border-white bg-green-600 flex items-center justify-center">
                    <PenIcon className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
              <div className="col-span-1 md:col-span-2 space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Nom" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Postnom" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Prenom" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 space-y-6 md:space-y-0 gap-2">
              <FormField
                control={form.control}
                name="birthplace"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Lieu de naissance"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="citezen"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Nationalite" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 space-y-6 md:space-y-0 gap-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Telephone" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mail"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Adresse mail"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="marital"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Etat civil" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 space-y-6 md:space-y-0 gap-2">
              <FormField
                control={form.control}
                name="quarter"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Quartier" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="avenue"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Avenue" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="no"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="No" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="container flex justify-around pb-8 md:pt-4">
              <Button
                type="button"
                className="font-semibold border-2 border-slate-300 bg-white text-slate-400 uppercase hover:text-white hover:border-slate-700 hover:bg-slate-700 transition duration-200 ease-in-out"
                onClick={() => handleClick("back")}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="font-semibold border-2 border-green-600 bg-green-600 text-white uppercase hover:text-white hover:border-slate-700 hover:bg-slate-700 transition duration-200 ease-in-out"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? "SUbmitting..." : "Next"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Identity;
