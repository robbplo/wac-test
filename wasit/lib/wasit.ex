defmodule Wasit do
  @moduledoc """
  Documentation for `Wasit`.
  """
  @path "/home/robbin/projects/personal/wasmcloud-test/wac-test/pluggy.wasm"

  def doit do
    bytes = File.read!(@path)
    {:ok, pid} = Wasmex.Components.start_link(%{bytes: bytes})
    Wasmex.Components.call_function(pid, "calc", ["increment", 0])
  end
end
