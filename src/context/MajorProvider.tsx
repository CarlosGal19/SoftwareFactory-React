import { useState, createContext, ReactNode } from 'react';

interface MajorContextProps {
    major: number
    setMajor: (major: number) => void
}

interface MajorProviderProps {
    children: ReactNode
}

const MajorContext = createContext({} as MajorContextProps)

const MajorProvider = ({ children }: MajorProviderProps) => {

    const [major, setMajor] = useState(0)

    return (
        <MajorContext.Provider value={{ major, setMajor }}>
            {children}
        </MajorContext.Provider>
    )
}

export { MajorProvider, MajorContext }
