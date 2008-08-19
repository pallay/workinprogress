class AddFieldsToOffice < ActiveRecord::Migration

  def self.up
  	Office.create (:location => 'in the office')
  	Office.create (:location => 'at home')
  	Office.create (:location => 'on location')
  end

  def self.down
  	Office.delete_all
  end

end
