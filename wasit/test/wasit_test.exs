defmodule WasitTest do
  use ExUnit.Case
  doctest Wasit

  test "greets the world" do
    assert Wasit.hello() == :world
  end
end
