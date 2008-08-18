class AddScrapbookTable < ActiveRecord::Migration

  def self.up
    create_table :scrapbooks do |t|
      t.text :item
      t.integer :user_id
      t.timestamps
    end
  end

  def self.down
    drop_table :scrapbooks
  end

end
