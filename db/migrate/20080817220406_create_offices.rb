class CreateOffices < ActiveRecord::Migration
  def self.up
    create_table :offices do |t|
      t.string :location
      t.integer :user_id
      t.timestamps
    end
  end

  def self.down
    drop_table :offices
  end
end
