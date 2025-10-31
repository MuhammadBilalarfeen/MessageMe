class User < ApplicationRecord
  validates :username, presence: true, 
                       length: { minimum: 3, maximum: 20 }, 
                       uniqueness: { case_sensitive: false }
   has_many :messages, dependent: :destroy
  has_secure_password   # <-- This is required for authenticate to work
  
end
