// ** React Imports
import { forwardRef, ReactElement, Ref } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Slide, { SlideProps } from '@mui/material/Slide'
import DialogContentText from '@mui/material/DialogContentText'
import { AppDispatch } from 'src/store/store'
import { useDispatch } from 'react-redux'
import { deleteFarmer, deleteUser } from 'src/slice/farmers'

const Transition = forwardRef(function Transition(
  props: SlideProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

const DeleteDialog = ({ open, type, id, handleClose, delelteField }: any) => {
  const dispatch = useDispatch<AppDispatch>()

  const handleDelete = () => {
    const payload = {
      id: id
    }
    // console.log(payload, 'payload')

    switch (type) {
      case 'farmer':
        dispatch(deleteFarmer(payload))
        break
      case 'users':
        dispatch(deleteUser(payload))
        break
      //   case 'role':
      //     dispatch(deleteRoleById(payload))
      //     break
      //   case 'skill':
      //     dispatch(deleteSkillById(payload))
      //     break
      //   case 'token':
      //     dispatch(deleteTokenById(payload))
      //     break
      //   case 'user':
      //     dispatch(deleteEmployee(payload))
      //     break
      //   case 'company':
      //     dispatch(deleteJobCompany(payload))
      //     break
      //   case 'postApprove':
      //     dispatch(deleteJobPost(payload))
      //     break
      default:
        console.log('Does not exist DELETE ID!')
        break
    }
  }

  return (
    <>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle id='alert-dialog-slide-title'>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            Are you sure you want to delete this <strong>{delelteField}</strong> record?
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button variant='contained' onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant='contained'
            color='error'
            onClick={() => {
              handleDelete()
              handleClose()
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteDialog
