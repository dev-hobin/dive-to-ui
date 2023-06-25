import { StateFrom, EventFrom } from 'xstate'
import { machine } from '@/machines/checkbox'

export type State = StateFrom<typeof machine>
export type Send = (event: EventFrom<typeof machine>) => void
