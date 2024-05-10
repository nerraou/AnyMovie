import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, ReactNode } from "react";
import SignIn from "../molecules/SignIn";

interface FormPopoverProps {
  button: ReactNode;
  form: ReactNode;
}

function FormPopover(props: FormPopoverProps) {
  return (
    <Popover className="relative">
      <Popover.Button as="div" className="outline-none">
        {props.button}
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-10 right-0">
          {props.form}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default function NavBar() {
  const session: boolean = false;

  return (
    <header className="flex items-center h-20 bg-gunmetal px-8">
      <nav className="flex justify-between flex-grow">
        <section className="grid grid-cols-2 gap-1">
          <Link className="text-yellow text-base font-normal" href="/">
            Home
          </Link>

          <Link className="text-yellow text-base font-normal" href="/">
            My Movies
          </Link>
        </section>

        {session && (
          <section>
            <button className="text-olive-green text-base font-normal">
              Sign Out
            </button>
          </section>
        )}

        {!session && (
          <section className="grid grid-cols-2 gap-4">
            <FormPopover
              button={
                <button className="text-olive-green text-base font-normal">
                  Sign Up
                </button>
              }
              form={<SignIn />}
            />

            <FormPopover
              button={
                <button className="text-cream text-base font-normal">
                  Sign In
                </button>
              }
              form={<SignIn />}
            />
          </section>
        )}
      </nav>
    </header>
  );
}
