import '@styles/global.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
    title: "Remora",
    description: 'Create & Share AI Prompts'
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
        <head>
            <link rel="shortcut icon" href="/static/remora.svg" type="image/svg" />
        </head>
        <body>
            <Provider>
                <div className='main'>
                    <div className='gradient' />
                </div>

                <main className='app'>
                    <Nav />
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout;