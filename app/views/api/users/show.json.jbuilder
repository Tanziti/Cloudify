json.user do
  json.extract! @user, :id, :email, :username, :queue, :created_at, :updated_at
end