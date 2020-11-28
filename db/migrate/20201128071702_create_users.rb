class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :uid

      t.timestamps

      t.index :uid, unique: true
    end
  end
end
