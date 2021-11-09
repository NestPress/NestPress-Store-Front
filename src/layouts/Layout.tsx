import * as React from 'react'
import Head from 'next/head'
import { Breakpoints, Background } from 'components/layout'
import { MainMenu, Footer } from 'components/nav'
import { mainMenu, rightMenu } from 'blogData/data'
import Image from 'next/image'
import { NavLink } from 'components/nav'

type Props = {
  title?: string
}

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = 'MedBlog',
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Background gradient={true}>
      <Breakpoints className="text-white">
        <header className="md:flex text-sm items-center gap-x-5 uppercase">
          <NavLink  to="/">
            <Image src="/logo.svg" alt="Picture of the author" width={100} height={40} />
          </NavLink> 
          {/*<!-- MAIN MENU -->*/}
          <MainMenu className="pr-5 py-5 flex-1" actions={ mainMenu } />
          <MainMenu className="pr-5 py-5" actions={ rightMenu } hideIcon={true} />
        </header>
      </Breakpoints>
    </Background>
    <Breakpoints className="text-gray-700 pt-10">
      {children}
    </Breakpoints>
    <hr className="mt-10"/>
    <Footer logo="/logo_dark.svg" />
  </div>
)

export default Layout