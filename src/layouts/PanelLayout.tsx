import * as React from 'react'
import Head from 'next/head'
import { Breakpoints, Background, EmptyCard } from 'components/layout'
import { MainMenu, Footer, VerticalMenu } from 'components/nav'
import { profileMenu } from 'blogData/data'
import Image from 'next/image'
import { NavLink } from 'components/nav'

type Props = {
  title?: string
}

const PanelLayout: React.FunctionComponent<Props> = ({
  children,
  title = 'MedBlog',
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Background color="maincolor">
      <Breakpoints className="text-white">
        <header className="md:flex text-sm items-center gap-x-5 uppercase">
          <NavLink  to="/">
            <Image src="/logo.svg" alt="Picture of the author" width={100} height={40} />
          </NavLink> 
          {/*<!-- MAIN MENU -->*/}
          <MainMenu className="pr-5 py-5 flex-1" actions={ profileMenu } />
        </header>
      </Breakpoints>
    </Background>
    <Breakpoints className="text-gray-700 pt-10 flex">
      <div className="w-1/5 flex flex-col mr-5 mt-10">
        <VerticalMenu />
      </div>
      <EmptyCard className="flex-1 p-5">
        { children }
      </EmptyCard>
    </Breakpoints>
    <hr className="mt-10"/>
    <Footer />
  </div>
)

export default PanelLayout

