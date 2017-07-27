import { Enum } from 'enumify'

class EditState extends Enum{}

EditState.initEnum( ['NEW', 'EDIT']
)

export { EditState }
