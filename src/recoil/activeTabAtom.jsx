import { atom } from "recoil"

const activeTabAtom = atom({
    key: 'activeTabAtom',
    default: 'Create',
})

export default activeTabAtom