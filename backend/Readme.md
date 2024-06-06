## Schema Plan for Work Management Website

### Users Collection

- **Fields:**
  - `_id`: ObjectId, primary key
  - `username`: String, unique
  - `email`: String, unique
  - `password`: String, hashed
  - `profilePicture`: String, URL

### Todos Collection

- **Fields:**
  - `_id`: ObjectId, primary key
  - `userId`: ObjectId, reference to Users
  - `title`: String
  - `description`: String
  - `dueDate`: Date
  - `tags`: Array of ObjectIds, references to Tags
  - `isCompleted`: Boolean
  - `date`: Date

### Reminders Collection

- **Fields:**
  - `_id`: ObjectId, primary key
  - `userId`: ObjectId, reference to Users
  - `title`: String
  - `description`: String
  - `reminderDate`: Date
  - `tags`: Array of ObjectIds, references to Tags
  - `date`: Date

### Timetable Collection

- **Fields:**
  - `_id`: ObjectId, primary key
  - `userId`: ObjectId, reference to Users
  - `eventTitle`: String
  - `eventDescription`: String
  - `startTime`: Date
  - `endTime`: Date
  - `tags`: Array of ObjectIds, references to Tags
  - `date`: Date

### Tags Collection

- **Fields:**
  - `_id`: ObjectId, primary key
  - `name`: String
  - `type`: String (e.g., `todo`, `reminder`, `timetable`)

### Indexes

- **Users:**
  - `email`: Unique index
- **Todos:**
  - `userId`: Index
  - `tags`: Index
  - `date`: Index
- **Reminders:**
  - `userId`: Index
  - `tags`: Index
  - `date`: Index
- **Timetable:**
  - `userId`: Index
  - `tags`: Index
  - `date`: Index

### Query Patterns

- Fetching todos, reminders, and timetable entries for a specific date (today, tomorrow, day after tomorrow)
- Fetching items by tags
- Searching todos by due date and user

### Scalability and Maintenance

- Plan for sharding on `userId`
- Document schema changes and versioning strategy
