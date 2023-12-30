import { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { Logo } from "./logo.js";
import { SearchIcon } from "./SearchIcon.js";
import Login from "./login.js";
import SignIn from "./signin.js";


export default function Navigator() {


  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});

  const CheckLogin = async () => {
    const ftch = await fetch('/api/checkLogin');
    const data = await ftch.json();
    console.log(data.login);
    setLogin(data.login)
  }

  const dataUser = async () => {

    if (login) {
      const ftch = await fetch('/api/getAccount')
      const data = await ftch.json();
      setData(data)
      // console.log(data)
    }
  }

  const Logout = async () => {
    const ftch = await fetch('/api/logout');

    const data = await ftch.json();

    location.href = '/';
  }

  useEffect(() => {
    CheckLogin();
    dataUser();
  }, []);

  useEffect(() => {
    dataUser();
  }, [login]);

  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Logo />
          <p className=" sm:block font-bold text-inherit">Propinas App</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page" color="secondary">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
        {
          (!login) ?
            <>
              <Login />
              <SignIn />
            </>
            :
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Tu cuenta es</p>
                  {
                    (data.dt != undefined)?
                    
                  <p className="font-semibold">{data.dt.email}</p>
                  :
                  <></>
                  }
                </DropdownItem>
                <DropdownItem key="settings">Configuración</DropdownItem>
                <DropdownItem key="team_settings"><Link href={"/"+data.nameSite}>Sitio</Link></DropdownItem>
                {/* <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> */}
                <DropdownItem key="logout" color="danger" onPress={() => Logout()}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
        }
      </NavbarContent>
    </Navbar>
  );
}
