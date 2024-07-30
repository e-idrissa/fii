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
import { useFormState } from "../context";
import Stepper from "../stepper";

const EngagementSchema = z.object({
  nom: z.string().min(3, { message: "Minimum 3 caracteres" }),
  firstName: z.string().min(3, { message: "Minimum 3 caracteres" }),
  lastName: z.string().min(3, { message: "Minimum 3 caracteres" }),
});

type Props = {
  steps: string[];
};

const Engagement = ({ steps }: Props) => {
  const { handleClick, step } = useFormState();
  const form = useForm<z.infer<typeof EngagementSchema>>({
    resolver: zodResolver(EngagementSchema),
    defaultValues: {
      nom: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof EngagementSchema>) => {
    console.log(data);
    handleClick("next");
    console.log(step);
  };

  const { isValid, isSubmitting } = form.formState;

  return (
    <div className="flex flex-col justify-around md:mt-4">
      <Stepper steps={steps} currentStep={step} />
      <h1 className="text-xl font-semibold md:hidden text-gray-700 uppercase mb-4">
        Engagement
      </h1>
      <div className="md:mt-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full"
          >
            <FormField
              control={form.control}
              name="nom"
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
                    <Input placeholder="First Name" type="text" {...field} />
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
                    <Input placeholder="Last Name" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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

export default Engagement;
