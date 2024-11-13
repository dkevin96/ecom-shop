import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { AlertCircle } from 'react-feather';
import { Badge, TableContainer, Table, TableHeader, TableBody, TableRow, TableCell, TableFooter, Button } from '@windmill/react-ui';

import { selectCurrentUser, selectAllUser, fetchAllUser, deleteUser } from '../../features/users/usersSlice';
import ConfirmRemoveDialog from '../dialog/ConfirmRemoveDialog';

const AdminForm = props => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [isDialogOpen, setisDialogOpen] = useState(false);

  const { user, setIsdeleted } = props;

  // check the property from user
  // useEffect(() => {
  //   console.log(user);
  // });

  const d = new Date(user.date_joined);
  var date = d.getDate();
  var month = d.getMonth() + 1;
  var year = d.getFullYear();
  var dateStr = d.toDateString();

  const handleRemoveUser = () => {
    setisDialogOpen(true);
  };

  return (
    <>
      <TableCell>
        {user.first_name} {user.last_name}
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell className="items-center mr-8">{dateStr}</TableCell>
      <TableCell>
        {user.user_role === 'admin' ? <Badge type="success">{user.user_role}</Badge> : <Badge type="primary">{user.user_role}</Badge>}
      </TableCell>
      <TableCell>
        <Button layout="Link" onClick={handleRemoveUser}>
          <span>X</span>
        </Button>
        {isDialogOpen && <ConfirmRemoveDialog user={user} setisDialogOpen={setisDialogOpen} setIsdeleted={setIsdeleted} />}
      </TableCell>
    </>
  );
};

export default AdminForm;
