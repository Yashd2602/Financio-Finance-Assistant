import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../Redux/transactionSlice.js"

function RoleSwitcher() {
  const dispatch = useDispatch();
  const role = useSelector(s => s.transactions.role);

  return (
    <select id="sos1" value={role} onChange={e => dispatch(setRole(e.target.value))}>
      <option value="viewer">Viewer</option>
      <option value="admin">Admin</option>
    </select>
  );
}

export default RoleSwitcher;