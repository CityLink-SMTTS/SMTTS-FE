Fix Edit User Button

- Identified that the "Edit User" buttons in `UserManagement.jsx` had no `onClick` handlers.
- Added `editingId` state to track which user is being edited.
- Refactored `handleAddUser` to `handleSaveUser` to support both adding new users and editing existing ones.
- Created helper functions `openAddModal`, `openEditModal`, and `closeModal` to manage modal and form state.
- Connected the "Add New User" button to reset the form.
- Connected "Edit User" buttons (in table and details modal) to populate the form with user data and open the modal in edit mode.
- Updated the modal title and submit button text to reflect the current mode (Add vs Edit).
